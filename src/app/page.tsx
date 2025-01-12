import type { User } from '@/types';

const user: User = { id: 1, name: 'John Doe', email: 'john.doe@example.com' };

const Home = () => {
  return (
    <div>
      <section>
        <h1>Nexora</h1>
        <p>user.id: {user.id}</p>
        <p>user.name: {user.name}</p>
        <p>user.email: {user.email}</p>
      </section>
    </div>
  );
};

export default Home;
