import Link from "next/link";
import { useState } from "react";

const Landing = ()=> {
  const [name, setName] = useState<string>();
  return (

    <div>
      <input type="text" onChange={(e) => {
            setName(e.target.value);
        }}>
        </input>
        <Link href={`/room/?name=${name}`}>Join</Link>
    </div>
  )
}

export default Landing;
