export default async function getRestaurantMap() {
  const res = await fetch('/restaurants/all', {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (res.status !== 200) {
    alert(res.statusText);
      return null;
  }
  const json = await res.json();
  const restaurantDict = {};
  json.forEach((r) => {
    restaurantDict[r['id']] = r;
  });
  return restaurantDict;
}
