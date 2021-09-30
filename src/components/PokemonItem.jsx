import * as React from "react";
import PropTypes from "prop-types";
export function PokemonItem(props) {
    return (
      <li className='col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200'>
        <div className='flex-1 flex flex-col p-8'>
          <img className='w-32 h-32 flex-shrink-0 mx-auto bg-gray-200 rounded-full' src={props.image} alt='' />
          <h3 className='mt-6 text-gray-900 text-sm font-medium'>
            {props.name}
          </h3>
          <dl className='mt-1 flex-grow flex flex-col justify-between'>
            <dd className='text-gray-500 text-sm line-clamp-3'>{props.description}</dd>
          </dl>
        </div>
      </li>
    );
  }
  
PokemonItem.propTypes = {
  key: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
};
