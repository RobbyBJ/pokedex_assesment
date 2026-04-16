<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class PokemonController extends Controller
{
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
        $formattedData = [];

        foreach ($results as $pokemon) {
    
            $detailResponse = Http::get($pokemon['url']);

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