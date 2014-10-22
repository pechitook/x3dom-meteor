Boxes = new Meteor.Collection("boxes");

if (Meteor.isClient) {
  Session.set("color", "#aaa");

Template.body.helpers({
  boxes: function () {
    return Boxes.find();
  },
  colors: ["#FFBF27", "#E17244", "#483F36", "#4BC5FF", "#F7AE52"]
});

Template.body.events({
  "click .swatch": function () {
    Session.set("color", this.valueOf());
  },
  "mousedown x3d": function () {
    dragged = false;
  },
  "mousemove x3d": function () {
    dragged = true;
  },
  "mouseup shape": function (evt) {
    if (!dragged && evt.button === 1) {
      Boxes.insert({
        color: Session.get("color"),
        x: Math.floor(evt.worldX + evt.normalX / 2) + 0.5,
        y: Math.floor(evt.worldY + evt.normalY / 2) + 0.5,
        z: Math.floor(evt.worldZ + evt.normalZ / 2) + 0.5
      });
    } else if (!dragged &&
      (evt.button === 4 || evt.button === 2)) {
        Boxes.remove(evt.currentTarget.id);
    }
  }
});
}

// if (Meteor.isServer) {
//   Meteor.startup(function () {
//     // code to run on server at startup
//   });
// }
