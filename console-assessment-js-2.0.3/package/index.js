/**
 * Example problem with existing solution and passing test.
 * See problem 0 in the spec file for the assertion
 * @returns {string}
 */
exports.example = () => 'hello world';

exports.stripPrivateProperties = (privateProps, items) => {
  return items.map(item => {
      const newItem = { ...item };
      privateProps.forEach(prop => {
      delete newItem[prop];
      });
      return newItem;
  });
};
exports.excludeByProperty = (prop, items) => {
  return items.filter(item => !item.hasOwnProperty(prop));
};
exports.sumDeep = (items) => {
  return items.map(item => {
    const sum = item.objects.reduce((total, obj) => total + obj.val, 0);
    return { objects: sum };
  });
};
exports.applyStatusColor = (colorMap, items) => {
  const statusToColor = {};
  for (const [color, statuses] of Object.entries(colorMap)) {
    statuses.forEach(status => {
      statusToColor[status] = color;
    });
  }
  return items
    .map(item => {
      const color = statusToColor[item.status];
      if (color) {
        return { ...item, color };
      }
      return item;
    })
    .filter(item => item.color);
};
exports.createGreeting = (greet, greeting) => {
  return name => greet(greeting, name);
};
exports.setDefaults = (defaults) => {
  return item => {
    return { ...defaults, ...item };
  };
};
exports.fetchUserByNameAndUsersCompany = async (name, services) => {
  const res = await Promise.all([services.fetchStatus(),services.fetchUsers()]) ;
  const status = res[0];
  const user = res[1].filter(item => item.name === name)[0];
  const company = await services.fetchCompanyById(user.companyId);
  return { company, status, user };
};
