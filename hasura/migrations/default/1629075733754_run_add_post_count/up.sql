CREATE OR REPLACE FUNCTION users_posts_count(user_row users)
RETURNS BIGINT AS $$
  SELECT count(1) FROM posts WHERE user_id = user_row.id;
$$ LANGUAGE sql STABLE;
