/**
 * Waiter class
 * @author Yannick Galatol <yannick.galatol@gmail.com>
 * @since 07/09/2011
 * @module Yadobe
 **/
var DestinationClass = {
	/**
	 * Future position of the waiter on the grid
	 * @param Place position
	 */
	position: null,
	/**
	 * Function to execute when the waiter arrive on it destination
	 * @param Function actionOnArrival
	 */
	actionOnArrival: null
};
var Destination = new JS.Class(DestinationClass);