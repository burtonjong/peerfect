CREATE OR REPLACE FUNCTION get_types (enum_type text) 
RETURNS json AS $$
DECLARE
  json_data json;
  text_query text;
BEGIN 
  text_query := format (
    'SELECT array_to_json(enum_range(NULL::%s))',
    enum_type
  );

  EXECUTE text_query INTO json_data;

  RETURN json_data;
END 
$$ LANGUAGE 'plpgsql';