module.exports = {
    db: {
      user: process.env.DB_USER || "postgres",
      password: process.env.DB_PASSWORD || "4tmt1k3t$",
      host: process.env.DB_HOST || "172.16.66.103",
      port: process.env.DB_PORT || 5433,
      database: process.env.DB_DATABASE || "menu_carrusel",
    },
  };