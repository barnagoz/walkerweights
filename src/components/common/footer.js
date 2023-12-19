export default function Footer() {
  return (
    <div className="w-full h-32 bg-secondary absolute bottom-0 p-3">
      <div className="w-full rounded-xl bg-white p-4 h-full grid grid-cols-5">
        <div className="col-start-2 text-center text-muted-foreground">
          <h3 className="font-semibold">Walker & Weights</h3>
          <ul className="list-none">
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </div>
        <div className="text-center text-muted-foreground">
          <h3 className="font-semibold">Links</h3>
          <ul className="list-none">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Blog</a>
            </li>
          </ul>
        </div>
        <div className="text-center text-muted-foreground">
          <h3 className="font-semibold">Legal</h3>
          <ul className="list-none">
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Terms of Service</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
