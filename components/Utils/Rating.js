import { MdStarRate } from 'react-icons/md';

const Rating = ({ rating }) => {
  const arr = [];

  for (let i = 1; i <= rating; i++) {
    arr.push(i);
  }

  return (
    <>
      {arr.map((i) => {
        return (
          <MdStarRate color='red' key={i} fontSize='1.5rem' className='ms-1' />
        );
      })}
    </>
  );
};

export default Rating;
