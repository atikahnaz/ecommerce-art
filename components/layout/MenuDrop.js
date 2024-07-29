export default function MenuDrop({ close }) {
  const closeMenu = () => {
    close(false);
  };
  return (
    <>
      <div className=" bg-white w-full py-5 absolute top-0 left-0 pl-5">
        <div>Collection</div>
        <div>Gallery</div>
        <div>My Orders</div>
        <div onClick={closeMenu}>Close</div>
      </div>
    </>
  );
}
