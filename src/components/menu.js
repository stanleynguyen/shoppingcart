import * as React from "react"

export default function Menu(props) {
    return (
        <div className="text-gray-500">
        <div className="max-w-6xl mx-auto px-4 py-2 text-sm">
          <nav className="flex justify-end items-center flex-wrap gap-5">
            <button class="hover:text-pink-800"
                onClick={() => props.goPokemon()}
             >Pokemon</button>
            <button class="hover:text-pink-800"
                onClick={() => props.goCareer()}
             >Careers</button>
            <button class="hover:text-pink-800"
                onClick={() => props.goMarket()}
             >Marketplace</button>
          </nav>
        </div>
      </div>
        )


}