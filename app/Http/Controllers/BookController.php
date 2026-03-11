<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class BookController extends Controller
{
    public function search(Request $request)
    {
        $query = $request->input('q');

        if (!$query) {
            return response()->json(['items' => []]);
        }

        $apiKey = env('GOOGLE_BOOKS_API_KEY');
        
        $params = [
            'q' => $query,
            'maxResults' => 8,
        ];

        if ($apiKey) {
            $params['key'] = $apiKey;
        }

        $response = Http::get('https://www.googleapis.com/books/v1/volumes', $params);

        if ($response->successful()) {
            return response()->json($response->json());
        }

        return response()->json(['error' => 'Failed to fetch data'], 500);
    }
    public function show($id)
    {
        $apiKey = env('GOOGLE_BOOKS_API_KEY');
        
        $url = "https://www.googleapis.com/books/v1/volumes/{$id}";
        
        $params = [];
        if ($apiKey) {
            $params['key'] = $apiKey;
        }

        $response = Http::get($url, $params);

        if ($response->successful()) {
            return response()->json($response->json());
        }

        return response()->json(['error' => 'Failed to fetch book details'], 500);
    }
}
