import Link from "next/link";

export default function MenuDrop({ close }) {
  const closeMenu = () => {
    close(false);
  };
  return (
    <>
      <div className="bg-white absolute md:hidden shadow-xl space-y-3 m-4  w-full py-5 top-0 pl-5 left-0 z-30 ">
        <div>
          <Link href="/collection">
            <div onClick={closeMenu} className="">
              Collection
            </div>
          </Link>
        </div>
        <div>Gallery</div>
        <div>My Orders</div>
        <div className="cursor-pointer" onClick={closeMenu}>
          Close
        </div>
      </div>
    </>
  );
}
