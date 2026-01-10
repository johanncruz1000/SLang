BINDIR  = $(PREFIX)/bin
TARGET  = slang

all:
	@echo "Nothing to build"

install:
	install -m 755 -d $(BINDIR)
	install -m 755 std/$(TARGET) $(BINDIR)/$(TARGET)
	install -m 755 -d $(PREFIX)/$(TARGET)
	cp std/compiler.js $(PREFIX)/$(TARGET)
	cp std/setup.cpp $(PREFIX)/$(TARGET)
.PHONY: all install
