<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class PokemonController extends Controller
{
    /**
     * Get paginated Pokemon list with concurrent detail fetching.
     */
    public function index(Request $request)
    {
        $page = $request->query('page', 1);
        $limit = $request->query('limit', 20);
        $offset = ($page - 1) * $limit;

        $listResponse = Http::get("https://pokeapi.co/api/v2/pokemon", [
            'limit' => $limit,
            'offset' => $offset
        ]);

        if ($listResponse->failed()) {
            return response()->json(['error' => 'Failed to fetch from PokeAPI'], 500);
        }

        $results = $listResponse->json()['results'];

        // Use Http::pool to fetch all detail requests concurrently instead of sequentially
        $detailResponses = Http::pool(function ($pool) use ($results) {
            foreach ($results as $pokemon) {
                $pool->get($pokemon['url']);
            }
        });

        $formattedData = [];

        foreach ($detailResponses as $detailResponse) {
            if ($detailResponse->successful()) {
                $data = $detailResponse->json();

                $typesArray = [];
                foreach ($data['types'] as $typeItem) {
                    $typesArray[] = $typeItem['type']['name'];
                }

                $formattedData[] = [
                    'name' => $data['name'],
                    'image' => $data['sprites']['other']['official-artwork']['front_default'],
                    'types' => $typesArray,
                    'height' => $data['height'],
                    'weight' => $data['weight']
                ];
            }
        }

        return response()->json($formattedData);
    }

    /**
     * Search Pokemon by name across all species (not just loaded ones).
     * Supports partial name matching.
     */
    public function search(Request $request)
    {
        $query = strtolower(trim($request->query('q', '')));

        if (empty($query)) {
            return response()->json([]);
        }

        // Fetch the full Pokemon species list from PokeAPI (names + URLs only, lightweight)
        $listResponse = Http::get("https://pokeapi.co/api/v2/pokemon", [
            'limit' => 1025,
            'offset' => 0
        ]);

        if ($listResponse->failed()) {
            return response()->json(['error' => 'Failed to fetch from PokeAPI'], 500);
        }

        // Filter names that contain the search query, take top 20 matches
        $matchedPokemon = collect($listResponse->json()['results'])
            ->filter(fn($p) => str_contains($p['name'], $query))
            ->take(20)
            ->values();

        if ($matchedPokemon->isEmpty()) {
            return response()->json([]);
        }

        // Fetch details concurrently for all matched Pokemon
        $detailResponses = Http::pool(function ($pool) use ($matchedPokemon) {
            foreach ($matchedPokemon as $pokemon) {
                $pool->get($pokemon['url']);
            }
        });

        $formattedData = [];

        foreach ($detailResponses as $detailResponse) {
            if ($detailResponse->successful()) {
                $data = $detailResponse->json();

                $typesArray = [];
                foreach ($data['types'] as $typeItem) {
                    $typesArray[] = $typeItem['type']['name'];
                }

                $formattedData[] = [
                    'name' => $data['name'],
                    'image' => $data['sprites']['other']['official-artwork']['front_default'],
                    'types' => $typesArray,
                    'height' => $data['height'],
                    'weight' => $data['weight']
                ];
            }
        }

        return response()->json($formattedData);
    }
}