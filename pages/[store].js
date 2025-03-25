import fs from 'fs';
import path from 'path';

export async function getServerSideProps(context) {
  const { store } = context.params;
  const host = context.req.headers.host;

  // Load the store configurations from the JSON file
  const configPath = path.join(process.cwd(), 'storeConfigs.json');
  const configFile = fs.readFileSync(configPath, 'utf-8');
  const configs = JSON.parse(configFile);

  // Get the specific store configuration based on the URL parameter
  const storeConfig = configs[store] || null;

  if (!storeConfig) {
    // Return a 404 if the store configuration is not found
    return {
      notFound: true,
    };
  }

  // Redirect to a subpage if hitting a particular domain
  if (host === 'test-b2c.petermenocal.com') {
    return {
      redirect: {
        destination: '/b2c',
        permanent: false,
      },
    };
  }
  if (host === 'test-b2b.petermenocal.com') {
    return {
      redirect: {
        destination: '/b2b',
        permanent: false,
      },
    };
  }
  return {
    props: {
      storeConfig,
    },
  };
}

export default function StorePage({ storeConfig }) {
  return (
    <div
      style={{
        backgroundColor: storeConfig.branding.backgroundColor,
        color: storeConfig.branding.textColor,
        minHeight: '100vh',
        padding: '20px'
      }}
    >
      <header>
        <h1>{storeConfig.name}</h1>
        <nav>
          {storeConfig.navigation.map((item, index) => (
            <a key={index} href={item.link} style={{ marginRight: '15px' }}>
              {item.label}
            </a>
          ))}
        </nav>
      </header>
      <main>
        <p>Welcome to the {storeConfig.type} store!</p>
        <p>{storeConfig.description}</p>
      </main>
    </div>
  );
}