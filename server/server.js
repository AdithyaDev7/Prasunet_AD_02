angular.module('chatServerApp', [])
    .controller('ChatServerController', function ($scope) {
        const socket = io();

        this.messages = [];
        this.message = '';

        socket.on('chat message', (msg) => {
            $scope.$apply(() => {
                this.messages.push(msg);
            });
        });

        this.sendMessage = () => {
            if (this.message) {
                socket.emit('chat message', 'Server: ' + this.message);
                this.message = '';
            }
        };
    });
