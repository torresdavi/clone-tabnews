exports.up = (pgm) => {
  pgm.createTable("users", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },

    // For reference, GitHub limits usernames to 39 chacaracters.
    username: {
      type: "varchar(30)",
      notNull: true,
      unique: true,
    },

    // Why 254 characters ? https://stackoverflow.com/a/1199238
    email: {
      type: "varchar(254)",
      notNull: true,
      unique: true,
    },

    // Why 72 characters ? https://security.stackexchange.com/q/39849
    password: {
      type: "varchar(72)",
      notNull: true,
    },

    // Why timestamp with time zone? https://justatheory.com/2012/04/postgres-use-timestamptz/
    created_at: {
      type: "timestamptz",
      default: pgm.func("now()"),
      notNull: true,
    },

    updated_at: {
      type: "timestamptz",
      default: pgm.func("now()"),
      notNull: true,
    },
  });
};

exports.down = false;
