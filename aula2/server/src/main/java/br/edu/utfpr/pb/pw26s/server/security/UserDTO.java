package br.edu.utfpr.pb.pw26s.server.security;

import br.edu.utfpr.pb.pw26s.server.model.User;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserDTO {

    private long id;
    private String displayName;
    private String username;

    public UserDTO(User user) {
        this.id = user.getId();
        this.displayName = user.getDisplayName();
        this.username = user.getUsername();
    }
}
