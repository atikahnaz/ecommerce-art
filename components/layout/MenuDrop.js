import Link from "next/link";

export default function MenuDrop({ close }) {
  const closeMenu = () => {
    close(false);
  };
  return (
    <>
      <div className="bg-white absolute space-y-3 w-full py-5 top-0 pl-5 left-0">
        <div>
          <Link href="/collection">Collection</Link>
        </div>
        <div>Gallery</div>
        <div>My Orders</div>
        <div onClick={closeMenu}>Close</div>
      </div>
    </>
  );
}
