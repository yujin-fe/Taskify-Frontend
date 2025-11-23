import ReactDOM from 'react-dom';

export default function ModalPortal({ children }: { children: React.ReactNode }) {
  const modalRoot = document.getElementById('modal-root')!;
  return ReactDOM.createPortal(children, modalRoot);
}
