RM = rm -f

OBJECTS := $(wildcard *.sited)
TARGETS := $(addsuffix .xml,$(OBJECTS))

INDEX = index.html
INDEX_BASE_URL =
#INDEX_BASE_URL = ddcat.yinr.cc
# Docker Server Port
PORT = 80

# Generate *.sited.xml from *.sited
# change debug tag from 1 to 0
# TODO remove xml comment (<!-- .* -->) and js comment (\/\* .* \*\/)
%.sited.xml: %.sited
	@sed 's/debug="1"/debug="0"/' "$<" > "$@"
	@echo $@ Generated!

## Make targets start

build: $(TARGETS)

$(INDEX): $(OBJECTS) Makefile
	# $$(ip -o addr show up primary scope global | head -1 | sed -E 's#.* inet (\S+)/[0-9]+ .*#\1#')
	@INDEX_BASE_URL=$(INDEX_BASE_URL); \
		INDEX_BASE_IP="$$(ip route get 8.8.8.8 | sed -nE '/8.8.8.8/s/.*src (\S+) .*/\1/p')"; \
		tree -hrDCL 1 --prune \
		-H "sited://$${INDEX_BASE_URL:-$${INDEX_BASE_IP}}" \
		-P '*.sited' -o "$@" .
	@echo $@ Generated!

.PHONY: build index all new \
        server server-restart server-start server-status server-stop \
        clean cleanall

new: template.sited.xml
	@read -p "input new name (without ext): " newFile && \
	 cp "$<" "$${newFile}".sited

index: $(INDEX)

all: build index

server: server-start server-status

server-start: index
	@echo -n 'Docker server: '
	@docker run --rm --name nginx-ddcat \
	        -v "$$PWD":/usr/share/nginx/html:ro \
	        -p $(strip $(PORT)):80 -d \
	        nginx:alpine

server-status:
	@docker ps -f name=nginx-ddcat

server-restart:
	@docker restart nginx-ddcat

server-stop:
	docker stop nginx-ddcat

clean:
	-$(RM) $(TARGETS)

cleanindex:
	-$(RM) $(INDEX)

cleanall: cleanindex clean
