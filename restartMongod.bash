#MongoDB was shut down while you were away.
#Clean up the old instance:
mongod --repair
#Start it back up:
mongod --nojournal --fork --syslog