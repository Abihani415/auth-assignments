export default (sequelize, Sequelize) => {
  const User = sequelize.define('User', {
    // Model attributes are defined here
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    firstName: {
      type: Sequelize.STRING
      // allowNull defaults to true
    }
  }, {
    // Other model options go here
  });
  return User;
}
