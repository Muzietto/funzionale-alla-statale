const { expect } = chai;

const colombia = newItem('CO');

const pp_1_euro = newItem('1 euro');
const pp_2_euro = newItem('2 euro');
const pp_3_euro = newItem('3 euro');

const conn1 = newItem('conn1');
const conn2 = newItem('conn2');

const cp_vodafone = newItem('CP Vodafone');
const cp_telfort = newItem('CP Telfort');
const cp_kpn = newItem('CP KPN');
const cp_tmobile = newItem('CP T-Mobile');

const route1 = newItem('route1');
const route2 = newItem('route2');
const route3 = newItem('route3');
const route4 = newItem('route4');
const route5 = newItem('route5');

const sdk = newItem('sdk');
const sms = newItem('sms');
const desktop = newItem('desktop');

const leaf1 = leaf(cp_tmobile);
const leaf2 = leaf(sms);

const subtree1 = node(route3, [
  leaf(sdk),
  leaf2,
]);

const tree1 = node(colombia, [
  leaf(pp_1_euro),
  node(pp_2_euro, [
    node(conn1, [
      node(cp_vodafone, [
        leaf(route1),
        leaf(route2),
        subtree1,
      ]),
      leaf1,
    ]),
    leaf(conn2),
  ]),
]);
