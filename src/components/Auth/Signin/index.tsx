import Link from "next/link";
import SigninWithPassword from "../SigninWithPassword";

export default function Signin() {
  return (
    <>
      <div>
        <SigninWithPassword />
      </div>

      {/* <div className="mt-6 text-center">
        <p>
          Forgot password?{" "}
          <Link href="/auth/forgot-password" className="text-primary">
           I am forgot
          </Link>
        </p>
      </div> */}
    </>
  );
}
