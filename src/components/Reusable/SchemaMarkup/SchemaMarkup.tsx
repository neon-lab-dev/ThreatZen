/* eslint-disable @typescript-eslint/no-explicit-any */
import { Helmet } from 'react-helmet-async';

const SchemaMarkup = ({ schema } : { schema: any }) => {
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default SchemaMarkup;