import React from 'react';

function User({ user: {photoURL, displayName} }) {
    return (
        <div className='flex items-center'>
            <img className='w-8 h-8 mr-2 rounded-full' src={photoURL} alt={displayName} />
            <span className='hidden mr-2 md:block'>{displayName}</span>
        </div>
    );
}

export default User;