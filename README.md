# Fullstack Pokédex Assessment

This is a decoupled full-stack application built for a technical assessment. It features a Next.js (React) frontend that consumes a custom Laravel API to display a responsive, searchable, and paginated grid of Pokémon.

---

## Tech Stack

* **Frontend:** Next.js (App Router), React, Tailwind CSS
* **Backend:** Laravel 11, PHP 8.x
* **External API:** PokeAPI v2

---

## Setup Instructions

To run this project locally, you will need two separate terminal windows running simultaneously—one for the backend and one for the frontend.

### Prerequisites
Ensure you have the following installed on your machine:
* [Node.js](https://nodejs.org/) (v18+)
* [PHP](https://www.php.net/) (v8.2+)
* [Composer](https://getcomposer.org/)

### 1. Backend Setup (Laravel)
Open your first terminal and navigate to the backend directory:

```
cd backend
```

Install the PHP dependencies:

```
composer install
```
Start the Laravel development server:
```bash
php artisan serve
```

### 2. Frontend Setup (Next.js)
Open a second terminal and navigate to the frontend directory:
```bash
cd frontend
```
Install the Node dependencies:
```bash
npm install
```

Start the Next.js development server:
```bash
npm run dev
```

## API Documentation

The Laravel backend acts as a Backend-For-Frontend (BFF), aggregating data from the external PokeAPI to serve a clean, single JSON response tailored specifically for the Next.js frontend.

### `GET /api/pokemons`

Fetches a paginated list of Pokémon, including their detailed stats, types, and official artwork.

#### Query Parameters

| Parameter | Type    | Default | Description                                      |
| :-------- | :------ | :------ | :----------------------------------------------- |
| `page`    | integer | `1`     | The page number to fetch for pagination.         |
| `limit`   | integer | `20`    | The number of Pokémon to return per request.     |

#### Example Request
`GET http://localhost:8000/api/pokemons?page=1&limit=20`

#### Example Response (200 OK)
```json
[
  {
    "name": "bulbasaur",
    "image": "[https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png](https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png)",
    "types": [
      "grass",
      "poison"
    ],
    "height": 7,
    "weight": 69
  },
]