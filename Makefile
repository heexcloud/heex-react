.PHONY: copy build release

copy:
	rm -rf src/
	cp -r ../heex/src/Heex/ ./src

build:
	yarn build

release: build
	npm run release