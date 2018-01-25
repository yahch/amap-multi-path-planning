(function () {

    var routes = [];
    var mcoords = [];
    var cwalking = new AMap.Walking();;
    var complete = null;

    function route_point(idx) {
        if (idx === (mcoords.length - 1)) {
            complete(routes);
        } else {
            cwalking.search(mcoords[idx], mcoords[idx + 1], function (r, s) {
                if (s.info === 'ok') {
                    routes.push(s.routes);
                    idx++;
                    route_point(idx);
                }
            });
        }
    }

    function route_amap(coords, callback) {
        complete = callback;
        if (!Array.isArray(coords)) return;
        if (coords.length < 1) return;
        mcoords = coords;
        route_point(0);
    }

    window.walking2 = {
        search: route_amap
    }

})(this)