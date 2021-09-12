export default function CartLine(props) {
    return (
      <li className="flex px-4 sm:px-6 py-4">
        <img className="h-10 w-10 rounded-full" src={props.imageUrl + "&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=40&amp;h=40&amp;q=80"} alt="" />
        <div className="flex-1 flex justify-between items-center ml-3">
          <div>
            <p className="text-sm font-medium text-gray-900">{props.title}</p>
            <p className="text-sm text-gray-500">${props.price} x {props.quantity}</p>
          </div>
          <div className="flex items-center gap-2">
            <div>${props.amount}</div>
            <button type="button" className="
                text-red-400
                p-1
                rounded-full
                hover:bg-gray-50
                focus:outline-none
                focus:bg-gray-50
                focus:ring
                focus:ring-pink-500
                focus:ring-opacity-30
                transition
                duration-150
                ease-in-out
              " title="Remove item" onClick={() => props.onDele()}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
            </button>
          </div>
        </div>
      </li>

)}