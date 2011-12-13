

ember:

	cd ./packages/ember.js; \
		rake clean; \
		rake 

	cp -pr ./packages/ember.js/dist/ember.js assets/ember.js

log:
	@NODE_ENV=test echo 'testo is a proof ' 


.PHONY: test log
