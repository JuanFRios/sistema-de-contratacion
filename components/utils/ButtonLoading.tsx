import { Button } from '@mui/material';
import ReactLoading from 'react-loading';

interface ButtonLoadingProps {
  loading: boolean;
  text: string;
  isSubmit: boolean;
  onClick?: () => {};
}

function ButtonLoading({
  loading,
  text,
  isSubmit = true,
  onClick,
}: ButtonLoadingProps) {
  return (
    <Button
      type={isSubmit ? 'submit' : 'button'}
      className='text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-semibold rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 focus:outline-none '
      onClick={onClick}
      color='success'
      variant='contained'
    >
      {loading ? (
        <div className='flex w-full justify-center'>
          <ReactLoading type='spin' color='#fff' height={30} width={30} />
        </div>
      ) : (
        <span>{text}</span>
      )}
    </Button>
  );
}

export { ButtonLoading };
