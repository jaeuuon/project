package kr.jaeuuon.security.source.security.userdetails.impl;

import com.querydsl.core.annotations.QueryProjection;
import kr.jaeuuon.common.basic.source.code.impl.AuthorityCode;
import kr.jaeuuon.common.jpa.source.code.impl.StatusCode;
import lombok.AccessLevel;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserDetailsImpl implements UserDetails {

    @Getter
    private long id;

    @Getter
    private String email;

    private String password;

    @Getter
    private String name;

    private Set<GrantedAuthority> authorities;

    private StatusCode statusCode;

    public UserDetailsImpl(long id, Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.authorities = new HashSet<>(authorities);
    }

    @QueryProjection
    public UserDetailsImpl(long id, String email, String password, String name, Set<Authority> authorities, StatusCode statusCode) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
        this.authorities = authorities.stream().filter(authority -> authority.getCode() != null).map(authority -> new SimpleGrantedAuthority(authority.getCode().name())).collect(Collectors.toSet());
        this.statusCode = statusCode;
    }

    @Override
    public Collection<GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return name;
    }

    @Override
    public boolean isEnabled() {
        return StatusCode.ACTIVATED.equals(statusCode);
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    @EqualsAndHashCode(of = "code")
    public static class Authority {

        private AuthorityCode code;

        @QueryProjection
        public Authority(AuthorityCode code) {
            this.code = code;
        }

    }

}
