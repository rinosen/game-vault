"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteButton({ id }: { id: number }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmed = confirm("Apakah kamu yakin ingin menghapus game ini?");
    
    if (confirmed) {
      setIsDeleting(true); 

      try {
        const res = await fetch(`/api/games/${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          router.refresh();
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