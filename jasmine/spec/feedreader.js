/* feedreader.js */

/* All tests are placed within the $() function to make sure they 
 * don't run until the DOM is ready because some of these tests may require 
 * DOM elements.
 */
$(function() {
    /* Test for the RSS feeds definitions */
    describe('RSS Feeds', function() {

        /* Test that the allFeeds variable has been defined and that it's not empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Test that each feed in the allFeeds object has a 
         * URL defined and that the URL is not empty.
         */
        it('has URL', function() {
            allFeeds.forEach(function(element) {
                expect(element.url).toBeDefined();
                expect(element.url).not.toBe('');
            });
        });

        /* Test that each feed in the allFeeds object has a 
         * name defined and that the name is not empty.
         */
        it('has name', function() {
            allFeeds.forEach(function(element) {
                expect(element.name).toBeDefined();
                expect(element.name).not.toBe('');
            });
        });

    });


    /* Test for the menu */
    describe('The menu', function() {
        const menu = document.getElementsByTagName('body')[0];

        /* Test to make sure the menu element is hidden by default. */
        it('is hidden by default', function() {
            expect(menu.classList.contains('menu-hidden')).toBe(true);
        });

        /* Test that the menu changes visibility when the menu 
         * icon is clicked. 
         */
        it('change visibility on click', function() {
            const menuIcon = document.querySelector('.menu-icon-link');
            menuIcon.click();
            expect(menu.classList.contains('menu-hidden')).toBe(false);
            menuIcon.click();
            expect(menu.classList.contains('menu-hidden')).toBe(true);
        });

    });


    /* Test for the "Initial Entries" */
    describe('Initial Entries', function() {

        /* Test to make sure that when the loadFeed function is called and 
         * completes its work, there is at least a single .entry element 
         * within the .feed container.
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('should load at least one entry element', function(done) {
            expect($('.feed .entry')).not.toBe(null);
            done();
        });
     });


    /* Test for the "New Feed Selection" RSS definition */
    describe('New Feed Selection', function() {
        let firstFeed, secondFeed;

    /* Test that the contect actually changes when a new feed is loaded by the loadFeed function
    */
        beforeEach(function(done) {
            loadFeed(0, function() {
                firstFeed = document.querySelector('.feed').innerHTML;
                loadFeed(1, function() {
                    secondFeed = document.querySelector('.feed').innerHTML;
                    done();
                });
            });
        });

        it('should load new content', function(done) {
            expect(firstFeed).not.toBe(secondFeed);
            done();
        });

    });

}());
