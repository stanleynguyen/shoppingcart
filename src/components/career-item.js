import IconBag from "./icon-bag";
import {TrashIcon} from "@heroicons/react/solid";

export default function CareerItem(props) {
    return (

<div className="js-career-item">
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-4 flex items-center sm:px-6">
                  <div className="
                      min-w-0
                      flex-1
                      sm:flex sm:items-center sm:justify-between
                    ">
                    <div>
                      <div className="
                          text-sm
                          leading-5
                          font-medium
                          text-pink-600
                          truncate
                        ">
                        {props.name}
                        <span className="ml-1 font-normal text-gray-500">in {props.dept}
                        </span>
                      </div>
                      <div className="mt-2 flex">
                        <div className="
                            flex
                            items-center
                            text-sm
                            leading-5
                            text-gray-500
                            gap-2
                          ">
                          <button type="button" className="
                              js-edit-btn
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
                            " onClick={() => props.onEdit()}
                            title="Edit">
                              <IconBag />
                          </button>


                          <span>Level: {props.level}</span>
                          {props.level === 'internship' && (
                            <span className="
                                inline-flex
                                items-center
                                px-2.5
                                py-0.5
                                rounded-full
                                text-xs
                                font-medium
                                bg-green-100
                                text-green-800
                              ">
                              Student-friendly
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="
                      ml-5
                      flex-shrink-0
                      inline-flex
                      items-center
                      justify-center
                      gap-2
                    ">
                    <button type="button" className="
                        js-delete-btn
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
                      " onClick={() => props.onDele()}
                      title="Delete">
                      <TrashIcon className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

    )
}
