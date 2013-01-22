/**
 * User: Troy
 * Date: 8/14/12
 * Time: 9:13 PM
 */

"use strict";

var RocknCoder = RocknCoder || {};

RocknCoder.Panel = (function () {
	var $panel, $expand, $markerDrop, $collapse, hideLeft, showLeft, isHidden = true,
		setPanel = function (isHidden) {
			$panel.css({left: isHidden ? hideLeft : showLeft});
		},
		init = function (currentPage) {
			$panel = $("#panel", currentPage);
			$expand = $(".expand", currentPage);
			$collapse = $(".collapse", currentPage);
			$markerDrop = $("#dropMarker", currentPage);
			hideLeft = parseInt($panel.attr("data-panel-hide"), 10);
			showLeft = parseInt($panel.attr("data-panel-show"), 10);
			setPanel(isHidden);

			$markerDrop.tap(function (event) {
				event.preventDefault();
				RocknCoder.GMaps.dropMarker();
				return false;
			});
			$collapse.tap(function (event) {
				event.preventDefault();
				if (!isHidden) {
					isHidden = true;
					setPanel(isHidden);
				}
				return false;
			});
			$expand.tap(function (event) {
				event.preventDefault();
				if (isHidden) {
					isHidden = false;
					setPanel(isHidden);
				}
				return false;
			});
		};
	return {
		init: init
	};
}());