<?php

namespace App\Http\Controllers;

use App\Models\Bookmark;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BookmarkController extends Controller
{
    public function toggle(Request $request)
    {
        $request->validate([
            'book_id' => 'required|string',
        ]);

        $user = Auth::user();
        $bookId = $request->book_id;

        $bookmark = $user->bookmarks()->where('book_id', $bookId)->first();

        if ($bookmark) {
            $bookmark->delete();
            $message = 'Bookmark dihapus!';
        } else {
            $user->bookmarks()->create([
                'book_id' => $bookId,
            ]);
            $message = 'Berhasil simpan ke bookmark!';
        }

        return back()->with('success', $message);
    }
}
