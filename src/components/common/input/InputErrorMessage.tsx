export default function InputErrorMessage({ children: message }: { children?: string }) {
  if (!message) {
    return null;
  }

  return <span className='font-md-regular text-error'>{message}</span>;
}
