import React, { useState } from "react";

export default function SignIn() {
   const [signIn, setSignIn] = useState(false);

  return (
		<div>
			<button
				className="btn btn-outline-dark col-sm-12 mt-3 mb-5 "
				type="submit"
				onClick={() => setSignIn(!signIn)}
			>
				{signIn ? "Sign out" : "Sign in"}
			</button>
		</div>
	);
}
