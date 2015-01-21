THREE.CrumpleGeometry = function (width, height, maxDepth, density) {

    THREE.Geometry.call(this);

    this.type = 'CrumpleGeometry';

    this.parameters = {
        width: width,
        height: height,
        maxDepth: maxDepth,
        density: density
    };

    var scope = this,
        aspectRatio = width / height;

    // Corners
    scope.vertices.push(
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(1, 0, 0),
        new THREE.Vector3(1, 1, 0),
        new THREE.Vector3(0, 1, 0)
    );

    // Horizontal edges
    for (var i = 0; i < density * aspectRatio; i++) {
        scope.vertices.push(
            new THREE.Vector3(Math.random(), 0, 0),
            new THREE.Vector3(Math.random(), 1, 0)
        );
    }

    // Vertical edges
    for (var i = 0; i < density / aspectRatio; i++) {
        scope.vertices.push(
            new THREE.Vector3(0, Math.random(), 0),
            new THREE.Vector3(1, Math.random(), 0)
        );
    }

    // Inside
    for (var i = 0; i < density * density; i++) {
        scope.vertices.push(
            new THREE.Vector3(Math.random(), Math.random(), 0)
        );
    }

    scope.mergeVertices();

    scope.vertices.forEach(function (vertex) {
        vertex.x = (vertex.x - 0.5) * width;
        vertex.y = (vertex.y - 0.5) * height;
        vertex.z = Math.random() * maxDepth;
    });

    Delaunay.triangulate(scope.vertices.map(function (vertex) {
        return [ vertex.x, vertex.y ];
    })).forEach(function (vertexIndex, indexIndex, vertexIndices) {
        if (indexIndex % 3 === 2) {
            scope.faces.push(
                new THREE.Face3(
                    vertexIndices[indexIndex],
                    vertexIndices[indexIndex - 1],
                    vertexIndices[indexIndex - 2]
                )
            );
        }
    });

    scope.computeFaceNormals();
};

THREE.CrumpleGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.CrumpleGeometry.prototype.constructor = THREE.CrumpleGeometry;
