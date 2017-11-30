var path = require('path');
var webpack = require('webpack');

module.exports = function(fabricatorConfig) {

	"use strict";

	var config = {
		entry: {
			fabricator: ['./src/fabricator/scripts/*.js'],
			display: ['./scripts/**/*.js']
		},
		output: {
//			path: path.resolve(__dirname, fabricatorConfig.dist.root),
            path: path.resolve(__dirname) + 'scripts/',
			filename: '[name].js'
		},
		module: {
			loaders: [
				{
					test: /\.js$/,
					exclude: /(node_modules|prism\.js)/,
					loaders: ['babel'],
					presets: ['es2015', 'stage-2']
				}
			]
		},
        resolve: {
            modulesDirectories: ['node_modules', 'bower_components']
        },
		plugins: [],
		cache: {}
	};

	if (!fabricatorConfig.dev) {
		config.plugins.push(
			new webpack.optimize.UglifyJsPlugin()
		);
	}

	return config;

};
