angular.module('chatClientApp', [])
    .controller('ChatClientController', function ($scope) {
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
                socket.emit('chat message', 'Client: ' + this.message);
                this.message = '';
            }
        };
    });
