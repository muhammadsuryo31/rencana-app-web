// Layout.jsx
import useVH from '../utils/dynamicHeight';
import './layout.css'

export default function Layout({ children }) {
  useVH();

  return (
    <div className="custom-screen-height bg-white">
      {children}
    </div>
  );
}
