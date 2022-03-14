import ReactLoading from 'react-loading';

const ButtonLoading = ({ loading, text }) => (
  <button type='submit' className='button-primary'>
    {loading ? (
      <div className='flex w-full justify-center'>
        <ReactLoading type='spin' color='#fff' height={30} width={30} />
      </div>
    ) : (
      <span>{text}</span>
    )}
  </button>
);

export { ButtonLoading };
