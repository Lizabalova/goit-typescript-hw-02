import { Audio } from 'react-loader-spinner'

export default function Loader() {
  return (
    <div style={{ textAlign: 'center', margin: '20px auto' }}>
      <Audio color="black" height={80} width={80} />
      <p>Loading data, please wait...</p>
    </div>
  );
}