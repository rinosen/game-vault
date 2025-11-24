"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteButton({ id }: { id: number }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    // 1. Konfirmasi ke user sebelum menghapus
    const confirmed = confirm("Apakah kamu yakin ingin menghapus game ini?");
    
    if (confirmed) {
      setIsDeleting(true); // Ubah status jadi loading agar tombol tidak diklik 2x

      try {
        // 2. Kirim request DELETE ke API yang sudah kita buat
        const res = await fetch(`/api/games/${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          // 3. Refresh router agar data cache Next.js diperbarui
          router.refresh();
          // 4. Kembali ke halaman list
          router.push("/games");
        } else {
          alert("Gagal menghapus game.");
          setIsDeleting(false);
        }
      } catch (error) {
        console.error("Error deleting game:", error);
        alert("Terjadi kesalahan sistem.");
        setIsDeleting(false);
      }
    }
  };

  return (
    <button 
      onClick={handleDelete} 
      className="btn btn-danger" 
      disabled={isDeleting}
    >
      {isDeleting ? "Deleting..." : "Delete Game"}
    </button>
  );
}