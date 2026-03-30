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

        $apiKey = config('services.google_books.key');
        
        if (!$apiKey) {
            return response()->json(['error' => 'API Key is missing. Google Books integration is disabled.'], 403);
        }
        
        $params = [
            'q' => $query,
            'maxResults' => 8,
            'key' => $apiKey,
        ];

        $response = Http::get('https://www.googleapis.com/books/v1/volumes', $params);

        if ($response->successful()) {
            return response()->json($response->json());
        }

        return response()->json(['error' => 'Failed to fetch data from Google Books'], 500);
    }

    public function show($id)
    {
        $apiKey = config('services.google_books.key');
        
        if (!$apiKey) {
            return response()->json(['error' => 'API Key is missing. Google Books integration is disabled.'], 403);
        }

        $url = "https://www.googleapis.com/books/v1/volumes/{$id}";
        
        $params = [
            'key' => $apiKey,
        ];

        $response = Http::get($url, $params);

        if ($response->successful()) {
            return response()->json($response->json());
        }

        return response()->json(['error' => 'Failed to fetch book details from Google Books'], 500);
    }
}
