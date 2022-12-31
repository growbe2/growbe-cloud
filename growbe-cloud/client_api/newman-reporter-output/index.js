var CurlReporter;

/**
 * Simple reporter that generates a curl statement
 *
 * @param {Object} newman - A run object with event handler specification methods.
 * @param {Function} newman.on - An event setter method that provides hooks for reporting collection run progress.
 * @param {Object} reporterOptions - A set of reporter specific run options.
 * @param {Object} options - A set of generic collection run options.
 * @returns {*}
 */
CurlReporter = function (newman, reporterOptions, options) {
    if (options.silent || reporterOptions.silent) {
        return;
    }

    newman.on('start', function (err, o) {
        if (err) { return; }
        // Can start opening a file here
    });

    newman.on('request', function (err, o) {
        const data = JSON.parse(o.response.stream);
        console.log(JSON.stringify(data));
    });

    newman.on('done', function () {
        // Can closing the file here
    });
};

CurlReporter.prototype.dominant = true;
module.exports = CurlReporter;
